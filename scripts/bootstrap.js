function bootstrap_libraries() {
    let library_load_start_time = new Date();
    fetch_lib("three.min.js").then(()=>{
        let library_load_end_time = new Date();
        console.log(`Three JS Library Loaded in ${(library_load_end_time - library_load_start_time) / 1000} Seconds`);
    });
}

function fetch_lib(library_name) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "libs/" + library_name);
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    document.body.appendChild((()=>{
                        let library_script_tag = document.createElement("script");
                        library_script_tag.innerHTML = request.responseText;
                        console.log(library_script_tag);
                        return library_script_tag;
                    })());
                    resolve();
                }
                else {
                    reject();
                }
            }
        };
        request.send();
    });
}