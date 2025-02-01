const Event = require('../models/Event');

// Obtener todos los eventos del usuario autenticado
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.userId }).sort({ date: 1 }); // Ordenar por fecha
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching events' });
  }
};

// Crear un nuevo evento
const createEvent = async (req, res) => {
  const { name, date, time, location, description } = req.body;
  try {
    const newEvent = new Event({
      name,
      date,
      time,
      location,
      description,
      user: req.userId, // Asociar el evento al usuario autenticado
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ msg: 'Error creating event' });
  }
};

// Actualizar un evento existente
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date, time, location, description } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Verificar que el evento pertenezca al usuario autenticado
    if (event.user.toString() !== req.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    event.name = name || event.name;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.description = description || event.description;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating event' });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Verificar que el evento pertenezca al usuario autenticado
    if (event.user.toString() !== req.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await event.remove();
    res.json({ msg: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting event' });
  }
};

// Filtrar eventos por fecha o ubicación
const filterEvents = async (req, res) => {
  const { date, location } = req.query;
  try {
    let query = { user: req.userId };

    if (date) {
      query.date = new Date(date); // Filtrar por fecha exacta
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
    }

    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Error filtering events' });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  filterEvents,
};