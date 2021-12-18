import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// the following is the code for a card component using which we display our data on dash board

const YoutubeDataCard = ({ youtubedatacard }) => {
    console.log(youtubedatacard)
    return (
        <div >
            {youtubedatacard ? (
                <Card style={{ margin: '20px' }} >
                    <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                        image= {youtubedatacard.img_url}
                        title={youtubedatacard.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h3">
                        {youtubedatacard.title}
                        </Typography>
                        <Typography component="p" style={{display:"inline-block",color:"#255483",fontSize:'13px',fontWeight:'bold'}}>
                        {youtubedatacard.description}
                        </Typography>
                        <Typography component="p" style={{paddingTop : '20px',color:"#34495E",fontSize:'10px',fontWeight:'bold'}}>
                        Publishing Date : {youtubedatacard.publishedAt.substring(0,10)}
                        </Typography>
                    </CardContent>
                </Card>
            ) : null}
        </div>
    )
}
export default YoutubeDataCard