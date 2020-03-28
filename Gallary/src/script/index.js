import '../style/sass/main.scss';

import Gallary from '../Gallary/gallary';


const nav = ['.all_image','.our_image','.site_image','.their_image']
const navItems = ['.gallary_item','.vanish_item','.vanish_item-2','.vanish_item-3']

new Gallary(nav,navItems,'.gallary_item');
