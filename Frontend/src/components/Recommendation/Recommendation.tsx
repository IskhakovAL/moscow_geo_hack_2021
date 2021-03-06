import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';
import styles from './recommendation.m.scss';
import { mapsActions } from '../../ducks/maps';

export default function Recommendation() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [recommendation, setRecommendation] = React.useState(false);
    const [sportType, setSportType] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setSportType(event.target.value);
    };

    const handleSwitch = (event) => {
        setRecommendation(event.target.checked);
        dispatch(mapsActions.fetchRecommendsMlSystem());
        dispatch(mapsActions.switchRecommends(event.target.checked));
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} className={styles.mr15}>
                Рекомендации
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Рекомендации</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Для помощи в принятии решения по построению новых спортивных объектов
                        используются рекомендации, построенные алгоритмами машинного обучения.
                        <br />
                        Используется алгоритм k-means для кластеризации спортивных объектов и
                        расчета информации по ним. Дополнительно для построения рекомендации
                        используются матричные преобразования.
                        <br />
                        Оптимальное число классов определяется методом Elbow Rule.
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel htmlFor="max-width">Выберите</InputLabel>
                            <Select
                                autoFocus
                                value={sportType}
                                onChange={handleMaxWidthChange}
                                label="maxWidth"
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value="swimmingPool">Бассейн</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            sx={{ mt: 1 }}
                            control={
                                <Switch
                                    checked={recommendation}
                                    disabled={!sportType}
                                    onChange={handleSwitch}
                                />
                            }
                            label="Отобразить полигон"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
