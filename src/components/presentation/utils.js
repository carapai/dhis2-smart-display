import Image from "spectacle/es/components/image";
import Slide from "spectacle/es/components/slide";
import Heading from "spectacle/es/components/heading";
import React from "react";

import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card/Card";
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

import { Scrollbars } from 'react-custom-scrollbars';


export const displayContent = (presentation, item) => {

    if (item.endpoint === "reportTables" && presentation.htmlTables) {
        return <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/>
    } else {
        return <div>
            <Image src={item.url} width="100%" height="100%" alt="Preview content"/>
        </div>
    }
};

export const displayPreviewContent = (presentation, item) => {
    if (item.endpoint === "reportTables") {
        if (presentation.htmlTables) {
            return <div>
            return <Scrollbars style={{height: 370}}><div>
                <div dangerouslySetInnerHTML={{__html: presentation.htmlTables[item.id]}}/></div>
            </Scrollbars>
        }
    } else {
        return <div style={{height: 370}}>
            <img src={item.url} width="100%" height="100%" alt="Preview content"/>
        </div>
    }
};

export const display = (presentation) => {
    const slideTheme = {
        width: '100%',
        margin: 10,
        marginBottom: 20,
        border: '1px solid #ff1e43',
    };

    return presentation.presentation.map(item => {
        return <Slide key={item.id} fit={true} style={slideTheme}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    {displayHeader(item)}
                    {displayContent(presentation, item)}
                </Grid>
            </Grid>
        </Slide>
    });
};

export const displayPreview = (presentation) => {
    return presentation.presentation.map(item => {
        return <Grid container spacing={8} key={item.id}>
            <Grid item xs={12}>
                <Paper className="slide-preview">
                    <Card className="slide-preview">
                        <CardContent style={{minHeight:370}}>
                            {displayPreviewContent(presentation, item)}
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    });
};


export const displayHeader = (item) => {
    if (item.endpoint === "reportTables") {
        return null;
    }
    return <Heading size={1} fit caps lineHeight={1} textColor="secondary">{item.name}</Heading>
};