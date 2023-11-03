const btnin = document.querySelector('.in');
const btnde = document.querySelector('.de');
let dis=document.getElementById("dis");


// let speed=1.0;

window.onload = function() {
    chrome.storage.sync.get(['speed'], function(result) {
        let speed =  1.0;
        
        dis.innerHTML = speed;
        chrome.storage.sync.set({speed: speed});
    });
};
btnin.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: increase,
        },
        async(results)=>{
            console.log(results);
            let speed=results[0].result.speed;
            dis.innerHTML=speed;
        }
        
        );
      
    });

btnde.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: decrease,
            
        },
        async(results)=>{
            console.log(results);
            let speed=results[0].result.speed;
            dis.innerHTML=speed;
        }
        );
    });
    // chrome.storage.sync.get(['speed'], function(result) {
    //     let speed = result.speed || 1.0;
    //     dis.innerHTML=speed;
    // });





function increase() {
    
    chrome.storage.sync.get(['speed'], function(result) {
        let speed = result.speed || 1.0;
        console.log("increase clicked")
        document.querySelector('video').playbackRate = speed;
        speed += 0.25;
        chrome.storage.sync.set({speed: speed});
        
    });
    let speed=chrome.storage.sync.get("speed");
    console.log(speed)
    return speed;
}


function decrease(){
    
    chrome.storage.sync.get(['speed'], function(result) {
        let speed = result.speed || 1.0;
        console.log("decrease clicked")
        document.querySelector('video').playbackRate = speed;
        speed -= 0.25;
        chrome.storage.sync.set({speed: speed});
        
    });
    let speed=chrome.storage.sync.get("speed");
    console.log(speed)
    return speed;
    
}


