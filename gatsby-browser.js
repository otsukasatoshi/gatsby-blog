import 'typeface-montserrat';
import 'typeface-notosans-jp';
import './src/styles/app.scss';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// refresh the page when service worker finds an update
export const onServiceWorkerUpdateReady = () => window.location.reload(true);
