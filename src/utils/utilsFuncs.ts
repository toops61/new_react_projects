export const changeBodySize = () => {
    const bodyDom = document.querySelector('body') as HTMLBodyElement;

    window.innerWidth < window.innerHeight ? bodyDom.style.height = window.innerHeight + 'px' : bodyDom.style.height = '';
}