import { useEffect, useState } from "react";
import Api from '../../../../services/Api';


const Organization = ({statement, setStatement, step, setStep}) => {

    const api = new Api();

    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        api.request('/api/organization', 'GET')
            .then(res => {
                switch (res.status)
                {
                    case 200:
                    case 201:
                        setOrganizations(res.data.data);
                        break;
                }
            });
    });

    const handleChange = (e) => {
        const {value, name} = e.target;
        // get organization
        let organization = {};
        for (let key in organizations){
            if (value==organizations[key]['id']){
                organization = organizations[key];
            }
        }
        setStatement({ ...statement, [name]: value, 'organization': organization });
        if (value!=''){
            setStep(step+1);
        }
    }

    return (
        <div className='form-group'>
            <label>Organization:</label>
            <select
                className='form-control'
                name='organization_id'
                onChange={ (e) => { handleChange(e) } }
            >
                <option value=''>-</option>
                {
                    organizations.map((value, index) => {
                        return (
                            <option key={index} value={value['id']}>{value['name']}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Organization;