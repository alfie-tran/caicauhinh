import { fileLoader } from 'ejs';
import pool from '../configs/connectDB';
import multer from 'multer';


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
    await pool.execute('insert into users(firstName, lastName, email, address) value(?, ?, ?, ?)', 
        [firstName, lastName, email, address]);
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

let getUploadFilePage = async(req, res)=>{
    return res.render('uploadFile.ejs');
}


let handleUploadFile = async (req, res) => {       

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }        

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMultipleFiles = async(req, res) => {
    
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log('>>>check files: ', files);
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
    
}


module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, 
    getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
}