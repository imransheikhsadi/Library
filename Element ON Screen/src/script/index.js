import '../style/sass/main.scss';
import OnScreen from '../../on-screen/on_screen';

new OnScreen([
    {
        element: '[data-visible]',
        callback: {
            in: (element)=>{
                console.log('item in'); 
            },
            out: ()=>{console.log('item out')}
        }
    },
    {
        element: '.main',
        callback: {
            in: (element)=>{
                console.log('main in'); 
                element.style.transform = 'rotate(360deg)'
            },
            out: ()=>{}
        }
    }
]);

