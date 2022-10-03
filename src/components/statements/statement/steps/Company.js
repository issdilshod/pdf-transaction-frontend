import { useEffect, useState } from "react";
import Api from '../../../../services/Api';


const Company = ({statement, setStatement, step, setStep}) => {

    const api = new Api();

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        api.request('/api/company', 'GET')
            .then(res => {
                setCompanies(res.data.data);
            });
    });

    const handleChange = (e) => {
        const {value, name} = e.target;
        setStatement({ ...statement, [name]: value });
        if (value!=''){
            setStep(step+1);
        }
    }

    return (
        <div className='form-group'>
            <label>Company:</label>
            <select
                className='form-control'
                name='company_id'
                onChange={ (e) => { handleChange(e) } }
                value={statement['company_id']}
            >
                <option value=''>-</option>
                {
                    companies.map((value, index) => {
                        return (
                            <option key={index} value={value['id']}>{value['name']} ({value['address']['address_line1']})</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Company;