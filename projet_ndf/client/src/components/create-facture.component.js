import React, { useState } from 'react';
import AuthService from "../services/auth.service";
import axios from 'axios';
//const Tesseract = require("tesseract.js")

function CreateFacture() {
  /** start states */
  const currentUser = AuthService.getCurrentUser();
  const [formData, setFormData] = useState('');
  const [info, setInfo] = useState({
    image: '',
    name: '',
  });

  const userId = currentUser.id
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });
  /** end states */

  // Upload image

  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append('userId',userId);
    data.append('factureImage', files[0]);
    data.append('name', files[0].name);
    setFormData(data);
    
  };
  
  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      image: '',
      name: ''
    });
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        //console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgressPercent(percent);
      },
    };
    axios
      .post('http://localhost:8080/factures/facture', formData, options)
      .then((res) => {
        //console.log(res);
        //console.log(res.data.facture.image);
      
        setTimeout(() => {
          setInfo(res.data.facture);
          setProgressPercent(0);
        }, 1000);

        
      })
      .catch((err) => {
        console.log(err.response);
        setError({
          found: true,
          message: err.response.data.errors,
        });
        setTimeout(() => {
          setError({
            found: false,
            message: '',
          });
          setProgressPercent(0);
        }, 3000);
      });
    
  };

/*
  const data = Tesseract.recognize(info.image.data, "spa+eng", {
    logger: (m) => console.log(m),
  })
  console.log(data.text)   
*/
  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column'>
      {error.found && (
        <div
          className='alert alert-danger'
          role='alert'
          style={{ width: '359px' }}
        >
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: '359px' }}>
        <div className='progress mb-3 w-100'>
          <div
            className='progress-bar'
            role='progressbar'
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progressPercent}
          </div>
        </div>
        <div className='custom-file mb-3'>
          <input
            type='file'
            className='custom-file-input'
            id='inputGroupFile04'
            aria-describedby='inputGroupFileAddon04'
            onChange={upload}
          />
          <label className='custom-file-label' htmlFor='inputGroupFile04'>
            Choose file
          </label>
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Submit
        </button>
      </form>
      <img
        className='mt-3'
        src={`http://localhost:8080/${info.image}`}
        alt={`${info.name}`}
        style={{ width: '359px' }}
      />
    </div>
  );
}

export default CreateFacture;
