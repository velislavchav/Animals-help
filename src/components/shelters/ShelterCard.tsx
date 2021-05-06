import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { IShelter } from '../../models/IShelter';

export default function ShelterCard(props: IShelter) {
    return (
        <Card component="article" className="shelter-card">
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        {props?.name.slice(0,2).toUpperCase()}
                    </Avatar>
                }
                title={props?.name}
                subheader={props?.address}
            />
            <CardMedia
                className="shelter-card-image"
                image={props?.imageUrl ? props.imageUrl : "/image-not-found.jpg"}
                title={props?.name}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props?.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
