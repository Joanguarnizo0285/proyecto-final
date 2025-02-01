import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error.response?.data?.msg || 'Error desconocido');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/events',
        { name, date, time, location, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents(); // Actualizar la lista de eventos
    } catch (error) {
      console.error('Error al crear evento:', error.response?.data?.msg || 'Error desconocido');
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" align="center">Eventos</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre del evento"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Hora"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <TextField
            label="Ubicación"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Agregar Evento
          </Button>
        </form>
        <List>
          {events.map((event) => (
            <ListItem key={event._id}>
              <ListItemText
                primary={event.name}
                secondary={`${event.date} - ${event.time} - ${event.location}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Home;