const baseHost = 'http://127.0.0.1:8000';


export async function fetchRiskTypeList() {
    const response = await fetch(`${baseHost}/api/risks/`);
    return response.json();
}


export async function fetchRiskTypeDetail({ id }) {
    const response = await fetch(`${baseHost}/api/risks/${id}/`);
    return response.json();
}
