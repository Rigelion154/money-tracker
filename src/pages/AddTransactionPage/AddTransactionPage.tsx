import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ROUTES} from "../../routes/routes.ts";


const AddTransactionPage = () => {
    return (
        <div>
            <Button variant='warning'>
                <Link to={ROUTES.MAIN} style={{color: 'inherit', textDecoration: 'none'}}>
                    Назад
                </Link>
            </Button>
        </div>
    );
};

export default AddTransactionPage;