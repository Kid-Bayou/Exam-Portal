import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"

function ModuleDetail(){
    const params = useParams()
    const [module, setModule] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
          try {
            const responseData = await get(`https://localhost:7182/api/Module/GetModule?id=${params.id}`);
            setModule(responseData);
          } catch(error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
    

    return (
        <div className="module-detail-container">
            <h3>Modules</h3>
            {module ? (
                <div className="module-detail">
                    <p>{module.description}</p>
                </div>
            ) : <h2>Loading</h2>}
        </div>
    )
}

export default ModuleDetail