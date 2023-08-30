import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ItemDto } from '../utils/actions/itemActions';

import { age, hobby } from '../constants/icons';
interface ItemListProps {
    data: ItemDto[]
}

const ItemList =(props: ItemListProps) => {
    const renderListItem = (item: ItemDto) => {
        console.log("image with no prefix");
        console.log(item.image);
        return (<>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={item.image!} />
                </ListItemAvatar>
              
            <ListItemText
                primary={item.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                        {age()}   {item.age}
                        </Typography>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {'    '}
                        </Typography>
                          {hobby() }  {item.hobby}
                    </React.Fragment>
                }
            />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>)
    }

    return (
        <List   sx={{ width: '100%',  bgcolor: 'background.paper'  }}>
            { props.data?.map((item) => renderListItem(item))}
        </List>
    );
}

export default ItemList; 
