const addPackageHeader = () => {
    // Abort if not on a package url
    if(location.pathname.indexOf("/package/") !== 0){
        return;
    }
    
    // Abort if already injected
    if(document.querySelector("[data-npmcdnlink]")){
        return;
    }

    // The best location for the unpkg link ?
    const packageHeader = document.querySelector('main h1');
    if(packageHeader){
        const packageName = packageHeader.textContent;
        const cdnUri = `https://unpkg.com/${packageName}/`;

        // Insert adjacent to h1
        packageHeader.insertAdjacentHTML('afterend', `<p data-npmcdnlink><a href="${cdnUri}">View on unpkg</a></p>`);
    }
}

// MutationObserver is prefixed in some browsers
let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
if(MutationObserver) {

    // Use MutationObserver to detect tab/page navigation
    const observer = new MutationObserver(addPackageHeader);
    observer.observe(
        document.querySelector("[data-reactroot]"),
        {
            childList: true,
            subtree: true
        }
    );
} else {

    // Use Mutation events to detect tab/page navigation
    document.querySelector("[data-reactroot]").addEventListener("DOMSubtreeModified", addPackageHeader);
}

// Initial
addPackageHeader();
