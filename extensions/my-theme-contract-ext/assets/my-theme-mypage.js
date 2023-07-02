const mysub_send = function (shop_url) {
    const url = `${shop_url}/apps/mysubpage?event=send&email=${window.document.getElementById('mysub_email').value}`;
    fetch(url, {
        method: "GET"
    }).then((res) => {
        res.json().then((data, errors) => {
            if (typeof errors !== 'undefined') {
                console.log(`Sending my subscription portal errors: ${JSON.stringify(errors, null, 4)}`);
                return;
            }
            window.document.getElementById('mysub_res').innerHTML = `<p>Access to your subscription page
             through the following link (<b>note that this should be shared by real email sending for real usage!</b>)</p>
             <p><a href="${data.link}" target="_blank">${data.link}</a></p>`;
        });
    });
};