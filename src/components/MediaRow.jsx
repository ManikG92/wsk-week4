import {Link} from 'react-router';

const MediaRow = ({item}) => {
  return (
    <tr>
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{width: '100px', height: 'auto'}}
        />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.username}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize} bytes</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={{item}}>
          Show
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
