import {createRoot} from 'react-dom/client';
import SocialApp from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SocialApp />);
  root.unmount();
});
