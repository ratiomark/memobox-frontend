/// <reference types="cypress" />
import { TEST_NAVIGATION_IDS } from '@/shared/const/testConsts'; // Импортируем константы

export class NavigateClass {
	navigateTo(id: keyof typeof TEST_NAVIGATION_IDS) {
		cy.getByTestId(TEST_NAVIGATION_IDS[id]).click();
	}

	navigateView() {
		this.navigateTo('navigateView');
	}

	navigateTrash() {
		this.navigateTo('navigateTrash');
	}

	navigateSettings() {
		this.navigateTo('navigateSettings');
	}

	navigateStats() {
		this.navigateTo('navigateStats');
	}

	navigateSubscription() {
		this.navigateTo('navigateSubscription');
	}

	navigateMain() {
		this.navigateTo('navigateMain');
	}

	navigateLogin() {
		this.navigateTo('navigateLogin');
	}
}

export const NavigateObject = new NavigateClass();
