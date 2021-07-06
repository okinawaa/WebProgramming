const draw_star_button = document.querySelector('#draw_star');
const draw_rect_counterclockwise_button = document.querySelector('#draw_rect_counterclockwise');
const draw_rect_clockwise_button = document.querySelector('#draw_rect_clockwise');
const box = document.querySelector('.box');
draw_star_button.addEventListener('click', () => {
    box.className = 'box draw_star';
})
draw_rect_counterclockwise_button.addEventListener('click', () => {
    box.className = 'box draw_rect_counterclockwise';

})
draw_rect_clockwise_button.addEventListener('click', () => {
    box.className = 'box draw_rect_clockwise';

})