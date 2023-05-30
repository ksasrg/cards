import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container/Container';
import { useAppSelector } from 'app/hooks';
import { RouterPaths } from 'common/router/router';
import { Navigate, useLocation } from 'react-router-dom';

import s from './style.module.css'

export function PacksList() {
    const location = useLocation();

    const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

    const mappedRows =
        <div className={s.row}>
            <div className={s.nameCol}>Name</div>
            <div className={s.cardsCol}>Cards</div>
            <div className={s.updatedCol}>Last Updated</div>
            <div className={s.createdCol}>Created by</div>
            <div className={s.actionsCol}>Actions</div>
        </div>

    if (!isAuthorized) {
        return <Navigate to={RouterPaths.signin} state={{ from: location }} />;
    }

    return (
        <Container style={{ maxWidth: "952px" }}>
            <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{
                    fontWeight: '600',
                    fontSize: '22px',
                    lineHeight: '27px',
                    color: '#000000',
                }}>Packs list</div>
                <Button size='large'>Add new pack</Button>
            </div>

            <div style={{ marginTop: '42px', display: 'flex', justifyContent: 'space-between' }}>
                <div>search</div>
                <div>filter</div>
                <div>number of cards</div>
                <div>reset</div>
            </div>
            <div style={{
                marginTop: '24px',
                textAlign: 'left'
            }}>
                <div className={s.hrow}>
                    <div className={s.nameCol}>Name</div>
                    <div className={s.cardsCol}>Cards</div>
                    <div className={s.updatedCol}>Last Updated</div>
                    <div className={s.createdCol}>Created by</div>
                    <div className={s.actionsCol}>Actions</div>
                </div>
                {mappedRows}
                {mappedRows}
                {mappedRows}
            </div>
            <div style={{
                marginTop: '36px',
                // display: 'flex', 
                // justifyContent: 'space-between' 
            }}>pagination</div>
        </Container>

    );
}
