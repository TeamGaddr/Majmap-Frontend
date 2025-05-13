//import HeaderComponent from 'src/layout/header/header.layout';
import { Outlet } from 'react-router-dom';

export default function HeaderFooterLayout() {
	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
			{/* <HeaderComponent /> */}

			<div className=" min-h-screen-2">
				<Outlet />
			</div>

		</>
	);
}
	