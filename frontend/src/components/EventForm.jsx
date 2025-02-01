import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const EventForm = ({ event, onSubmit }) => {
  const [name, setName] = React.useState(event?.name || '');
  const [date, setDate] = React.useState(event?.date || '');
  const [time, setTime] = React.useState(event?.time || '');
  const [location, setLocation] = React.useState(event?.location || '');
  const [description, setDescription] = React.useState(event?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, date, time, location, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre del evento"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Fecha"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <TextField
        label="Hora"
        type="time"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <TextField
        label="Ubicación"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <TextField
        label="Descripción"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {event ? 'Actualizar Evento' : 'Agregar Evento'}
        </Button>
      </Box>
    </form>
  );
};

export default EventForm;