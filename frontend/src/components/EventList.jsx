import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <List>
      {events.map((event) => (
        <ListItem key={event._id}>
          <ListItemText primary={event.name} secondary={`${event.date} - ${event.location}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default EventList;