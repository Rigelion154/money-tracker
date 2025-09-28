import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ROUTES} from "../../routes/routes.ts";


const MainPage = () => {
    return (
        <div className='text-start rounded-1'>
            MainPage
            <Button variant='warning'>
                <Link to={ROUTES.ADD_TRANSACTION} style={{color: 'inherit', textDecoration: 'none'}}>
                    Добавить расход
                </Link>
            </Button>
        </div>
    );
};

export default MainPage;