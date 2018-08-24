const baseHost = process.env.REACT_APP_API_HOST;


export async function fetchRiskTypeList() {
    const response = await fetch(`${baseHost}/api/risks/`);
    return response.json();
}


export async function fetchRiskTypeDetail({ id }) {
    const response = await fetch(`${baseHost}/api/risks/${id}/`);
    return response.json();
}
