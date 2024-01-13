
import { LazerLoader } from '@/shared/js/modules/lazer-loader';

// Into-Viewport Animation
const allLists = $$('.slider-teaser');

if (allLists.length) {
constLazer = newLazerLoader({
targets:allLists,
config: {
rootMargin:'0px',
threshold:0.01,
},
cb: (target, isAbove) => {
!isAbove && target.classList.add('ani-in');
},
});

Lazer.init();
}
 