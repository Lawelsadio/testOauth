import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function CreateUserFacture() {
  const [formData, setFormData] = useState('');
  const [info, setInfo] = useState({
    image: '',
    name: ''
  });

  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState({
    userId: null
  });

  useEffect(() => {
    axios.get('http://localhost:8080/users/test/allUsers')
    .then(res=>{     
        setUser(res.data); 
    })
      .catch(err=>{console.log(err);});
    },[]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });
  // Upload image
  let data = new FormData();
  const upload = ({ target: { files } }) => {
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
        setProgressPercent(percent);
      },
    };
    axios
      .post('http://localhost:8080/factures/userfacture/CreateUserFacture', formData, options)
      .then((res) => {
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
je fais une fonction ou un component didmount ayant une requete get qui va me recuperer tou
mes utilisateurs, avec leur nom, identifiant et role. puis m afficher leur nom dans 
une option de react.
en cliquant sur un nom je recupere le userId de lutilisateur et le soumetre avec la requete post 
pour enregistrer la facture avec l id de cet utilisarteur.
 */

  return (
    <div
      className='d-flex justify-content-center align-items-center flex-column'>
      {error.found && (
        <div
          className='alert alert-danger'
          role='alert'
          style={{ width: '1000px' }}>
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: '1000px' }}>
        <div className='progress mb-3 w-100'>
          <div
            className='progress-bar'
            role='progressbar'
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}>
            {progressPercent}
          </div>
        </div>

    <div class="form-group">
        <Form.Control required as="select" onChange={e => setUserId(e.target.value)} multiple>
     
        {user.map(r => (  
                <option 
                key={r._id} 
                value={r._id}>
                {r.username}
                </option>))}
        </Form.Control>
 
    </div>
        <div className='custom-file mb-3'>
          <input
            type='file'
            className='custom-file-input'
            id='inputGroupFile04'
            aria-describedby='inputGroupFileAddon04'
            onChange={upload}/>
          <label className='custom-file-label' htmlFor='inputGroupFile04'>
             file
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
        style={{ width: '700' }}
      />
    </div>
  );
}

export default CreateUserFacture;
