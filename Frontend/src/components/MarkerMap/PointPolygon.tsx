import { Polygon } from 'react-leaflet';
import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { mapsSelectors } from '../../ducks/maps';
import ReportModal from '../ReportModal/ReportModal';
import styles from './pointPolygon.m.scss';

const PointPolygon = () => {
    const pointInfo = useSelector(mapsSelectors.pointInfo);
    const analytics = useSelector(mapsSelectors.analytics);
    const isFetching = useSelector(mapsSelectors.isFetchingPointInfo);

    if (!Object.keys(pointInfo).length || analytics !== 'dot') {
        return null;
    }

    const renderList = (item, idx) => (
        <Typography component="p" key={idx} className={styles.item}>
            ● {item}
        </Typography>
    );

    return (
        <>
            <Polygon pathOptions={{ color: 'blue' }} positions={pointInfo.polygonList as any} />
            <ReportModal isFetching={isFetching}>
                <>
                    <Typography className={styles.mb5}>
                        <Typography component="span" className={styles.text}>
                            Суммарная площадь объектов:
                        </Typography>{' '}
                        {Math.round(pointInfo.totalAreaOfSportsZones)} м²
                    </Typography>
                    <Typography>
                        <Typography component="span" className={styles.text}>
                            Типы спортивных зон:
                        </Typography>
                        <Typography component="div" className={styles.typographyDiv}>
                            {pointInfo.typesOfSportsZones.map(renderList)}
                        </Typography>
                    </Typography>
                    <Typography>
                        <Typography component="p" className={styles.text}>
                            Виды спортивных услуг:
                        </Typography>{' '}
                        <Typography component="div" className={styles.typographyDiv}>
                            {pointInfo.typesOfSportsServices.map(renderList)}
                        </Typography>
                    </Typography>
                </>
            </ReportModal>
        </>
    );
};

export default PointPolygon;
