import pool from '../configs/connectDB';

let getHomepage = async (req, res) => {
    
        const [rows, fields] = await pool.execute('SELECT * FROM users');
        return res.render('index.ejs', { dataUser: rows, test: 'abc check test' });
    }

let getDetailPage = async (req, res) =>{
    let userId = req.params.id;
    let [user] = await pool.execute(`SELECT * FROM users where id = ?`, [userId]);
    // console.log('check req params: ', user)
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) =>{
    // console.log('>>>check req: ', req.body);    
    let {firstName, lastName, email, address}= req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) value(?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/');
}

let getEditPage = async (req, res) =>{
    //lấy id của user
    let id = req.params.id;

    let [user] = await pool.execute('select * from users where id = ?', [id]);
    return res.render('update.ejs', {dataUser: user[0]}) // x <- y: bien y gan cho bien x
}

let postUpdateUser = async (req, res) =>{
    let {firstName, lastName, email, address, id} = req.body;
    
    await pool.execute('UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?', 
        [firstName, lastName, email, address, id])
    // console.log('check request: ', req.body)
    // return res.send('hello update user')
    return res.redirect('/')
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}