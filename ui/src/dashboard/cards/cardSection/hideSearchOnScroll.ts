
export default function hideSearchBoxOnScroll()
{
    let dashboardMainWindow: HTMLElement = document.getElementById("dashboard-main-window")!;
    let searchBox: HTMLElement = document.getElementById("search-box")!;
    let scrollFadeThreshold = 10;

    dashboardMainWindow.addEventListener("scroll", () => 
    {
        let currentScrollValue: number = dashboardMainWindow.scrollTop;
        if (currentScrollValue > scrollFadeThreshold)
        {
           searchBox.classList.add("fade-out");
        }
        else
        {
           searchBox.classList.remove("fade-out");
        }
    })
}
