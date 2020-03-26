import '../style/sass/main.scss';
import OnScreen from '../../on-screen/on_screen';

new OnScreen([
    {
        element: '[data-visible]',
        callback: {
            in: (element)=>{
                // element.style.transform = 'translateX(30px)'
            },
            out: ()=>{console.log('item out')}
        }
    }
]);
