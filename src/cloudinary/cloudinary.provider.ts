import { CLOUDINARY } from '../const/const';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dimdjrct2',
      api_key: '853388963613864',
      api_secret: 'uDbqJ6rJHRLq3yLhcgUZTtDBCX8',
    });
  },
};
