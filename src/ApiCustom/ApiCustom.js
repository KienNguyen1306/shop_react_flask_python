import axios from 'axios';

async function Get_api(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error) {
            alert('Lỗi hệ thống !');
        }
    }
}

async function Send_Email(url, object) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    });
    const respData = await resp.json();
    return respData.data;
}

async function Pay_MoMo(url, object) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    });
    const respData = await resp.json();
    return respData;
}

async function Post_data(url, object) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    });
    const respData = await resp.json();
    return respData;
}

async function Put_data(url, object) {
    const resp = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    });
    const respData = await resp.json();
    return respData;
}
async function Delete_data(url) {
    const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const respData = await resp.json();
    return respData;
}

export { Get_api, Send_Email, Pay_MoMo, Post_data, Put_data, Delete_data };
