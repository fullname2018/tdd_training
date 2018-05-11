/* global expect, it, describe, jest, beforeEach */

import React from 'react';
import { shallow, mount } from 'enzyme';



const fakeState = [
    posts: [],
    items: [],
    isFetching: false,
    didInvalidate: false,
],
const mockFunction = jest.fn(),

    it("Контейнер должен отрендериться", () => {
        const component = shalow(
            <App
                state={fakeState}
                selectedSubreddit={mockFunction}
                posts={[]}
                isFetching
                lastUpdated
            />,
        );

        expect(component.exists()).toEqual(true);

    });

