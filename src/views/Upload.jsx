import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useMedia, useFile} from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to upload files.');
        return;
      }

      // Step 1: Upload the physical file to the Upload API
      const fileResult = await postFile(file, token);

      // Step 2: Post the metadata and filename to the Media API
      await postMedia(fileResult, inputs, token);

      alert('Upload successful!');
      navigate('/');
    } catch (e) {
      console.error('doUpload error:', e.message);
      alert('Upload failed: ' + e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      setFile(evt.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={inputs.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            value={inputs.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/200?text=Choose+image'
            }
            alt="preview"
            width="200"
          />
        </div>
        <button
          type="submit"
          disabled={!(file && inputs.title && inputs.title.length > 3)}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
