const addPackageHeader = () => {
    // Don't inject if already injected
    if(document.querySelector("[data-npmcdnlink]")){
        return;
    }

    // The best location for the unpkg link ?
    const packageHeader = document.querySelector('main h1');
    if(packageHeader){
        const packageName = packageHeader.textContent;
        const cdnUri = `https://unpkg.com/${packageName}/`;

        // insert adjacent to h1
        packageHeader.insertAdjacentHTML('afterend', `<p data-npmcdnlink><a href="${cdnUri}">View on unpkg</a></p>`);
    }
}

// MutationObserver is prefixed in some browsers
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
if(MutationObserver) {

    // Use MutationObserver to detect tab/page navigation
    const observer = new MutationObserver(addPackageHeader);
    observer.observe(
        document.querySelector("[data-reactroot] #top"),
        {
            childList: true,
            subtree: true
        }
    );
} else {

    // Use Mutation events to detect tab/page navigation
    document.querySelector("[data-reactroot] #top").addEventListener("DOMSubtreeModified", addPackageHeader);
}

// initial
addPackageHeader();
