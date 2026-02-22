import pool from './src/database/mysql';

async function checkSchema() {
    try {
        const [mascotasInfo] = await pool.query('DESCRIBE mascotas');
        const [duenosInfo] = await pool.query('DESCRIBE duenos');
        const [historialInfo] = await pool.query('DESCRIBE historial_clinico');

        console.log('--- MASCOTAS ---');
        console.log(mascotasInfo);
        console.log('--- DUENOS ---');
        console.log(duenosInfo);
        console.log('--- HISTORIAL CLINICO ---');
        console.log(historialInfo);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkSchema();
