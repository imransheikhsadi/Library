import '../style/sass/main.scss';

import Gallary from '../Gallary/gallary';

const bars = ['.all_image','.our_image','.site_image','.their_image']
const vanish = ['.gallary_item','.vanish_item','.vanish_item-2','.vanish_item-3']

new Gallary(bars,vanish);
