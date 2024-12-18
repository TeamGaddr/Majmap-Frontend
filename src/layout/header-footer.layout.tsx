import HeaderComponent from 'src/layout/header/header.layout';
import FooterComponent from 'src/layout/footer/footer.layout';
import { Outlet } from 'react-router-dom';

export default function HeaderFooterLayout() {
	return (
		<>
			{/* *~~*~~*~~ LAYOUT ~~*~~*~~* */}
			<HeaderComponent />

			<div className=" min-h-screen-2 mt-14   ">
				<Outlet />
			</div>

			<FooterComponent />
		</>
	);
}
