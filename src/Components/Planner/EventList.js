import React from 'react';
import { displayTime } from '../../Common/Services/EventService';
import { Card, CardContent, Select, MenuItem, Typography, FormControl, InputLabel } from '@mui/material';

const EventList = ({ events, day, selectFunction }) => {
  return (
    <>
        <div className="section" style={{ padding: '10px' }}>
            <Typography variant="h6" gutterBottom style={{ color: '#333', fontSize: '1.2rem' }}>
                This is your schedule for the selected day.
            </Typography>

            <FormControl fullWidth variant="outlined" style={{ marginBottom: '10px' }}>
                <InputLabel id="daySelectLabel" style={{ fontSize: '1.3rem' }}>Select Day</InputLabel>
                <Select
                    labelId="daySelectLabel"
                    id="daySelect"
                    value={day}
                    onChange={selectFunction}
                    label="Select Day"
                    style={{fontSize: '1.3rem' }}
                >
                    <MenuItem value="Today" >Today</MenuItem>
                    <MenuItem value="Sunday" >Sunday</MenuItem>
                    <MenuItem value="Monday" >Monday</MenuItem>
                    <MenuItem value="Tuesday" >Tuesday</MenuItem>
                    <MenuItem value="Wednesday" >Wednesday</MenuItem>
                    <MenuItem value="Thursday" >Thursday</MenuItem>
                    <MenuItem value="Friday" >Friday</MenuItem>
                    <MenuItem value="Saturday" >Saturday</MenuItem>
                    <MenuItem value="All Days" >All Days</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom style={{ color: '#333', fontSize: '1.1rem' }}>
                {day}'s Schedule
            </Typography>

            {/* Material UI Card for displaying events */}
            <div className="eventList">
                {day === "All Days" ? (
                    <>
                        {events.length === 0 ? 
                            <Typography variant="body2" style={{ color: '#777', fontSize: '0.9rem' }}>No events are on your schedule for any day.</Typography> 
                        : (
                            events
                                .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))
                                .map((c) => (
                                    <Card key={c.id} style={{ marginBottom: '15px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', fontSize: '0.9rem' }}>
                                        <CardContent>
                                            <Typography variant="h6" component="h5" style={{ color: '#333', fontSize: '1rem' }}>
                                                {c.get('name')} 
                                                <span style={{ fontSize: '0.85em', color: '#666' }}> ({c.get('building').get("name")})</span>
                                            </Typography>
                                            <Typography variant="body2" style={{ color: '#555', fontSize: '0.85rem' }}>
                                                {displayTime(c)} | {c.get('days').join(', ')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))
                        )}
                    </>
                ) : ( 
                    <>
                        {events.filter((c) => c.get('days').some((d) => d === day)).length === 0 ? 
                            <Typography variant="body2" style={{ color: '#777', fontSize: '0.9rem' }}>Nothing scheduled for {day}.</Typography> 
                        : (
                            events
                                .filter((c) => c.get('days').some((d) => d === day))
                                .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))
                                .map((c) => (
                                    <Card key={c.id} style={{ marginBottom: '15px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', fontSize: '0.9rem' }}>
                                        <CardContent>
                                            <Typography variant="h6" component="h5" style={{ color: '#333', fontSize: '1rem' }}>
                                                {c.get('name')} 
                                                <span style={{ fontSize: '0.85em', color: '#666' }}> ({c.get('building').get("name")})</span>
                                            </Typography>
                                            <Typography variant="body2" style={{ color: '#555', fontSize: '0.85rem' }}>
                                                {displayTime(c)} | {c.get('days').join(', ')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))
                        )}
                    </>
                )}
            </div>
        </div>
    </>
  );
};

export default EventList;
