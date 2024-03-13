import { Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from "@mui/material";
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from "react-router-dom";
import { Box} from '@mui/system';
import { useEffect, useState } from "react";
import {NoteAddOutlined} from '@mui/icons-material'
import moment from 'moment';
export default function NoteList() {
    const {noteId, folderId} = useParams();
    const [activeNoteId, setActiveNoteId] = useState(noteId);
    const navigate = useNavigate();
    const {folder} = useLoaderData();
    const submit = useSubmit();
    const handleAddNewNote = () => {
        submit({
            content: '', folderId
        }, {method: 'post', action: `/folders/${folderId}`});
    }

    useEffect(() => {
        if(noteId){
            setActiveNoteId(noteId);
            return;
        }
        if(folder?.notes?.[0]){
            navigate(`note/${folder.notes[0].id}`);
        }

    }, [noteId, folder.notes]);
    return ( 
        <Grid container height='100%'>
            <Grid item xs={4} sx={{width: '100%', maxWidth: '360', bgcolor: '#F0EBE3', height: '100%', overflowY: 'auto', padding: '10px', textAlign: 'left'}}>
                <List
                    subheader={
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                            <Typography sx={{fontweight: 'bold'}}>Notes</Typography>
                            <Tooltip title="Add note" onClick={handleAddNewNote}>
                                <IconButton size="small">
                                    <NoteAddOutlined/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }    
                >
                    {folder.notes.map(({id, content, updatedAt}) => {
                        return <Link
                            key={id}
                            to={`note/${id}`}
                            style={{textDecoration: 'none'}}
                            onClick={() => setActiveNoteId(id)}
                        >
                            <Card sx={{mb: '5px', backgroundColor:
                                 id === activeNoteId ? 'rgb(255 211 140)' : null,}}>
                                <CardContent sx={{'&:last-child': {pb: '10px'}, padding: '10px'}}>
                                    <div style={{fontSize: 14, fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: `${content.substring(0,30) || 'Empty'}`}}/>
                                    <Typography sx={{fontSize: '10px'}}>
                                        {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    })}
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet/>
            </Grid>
        </Grid>

    );
}