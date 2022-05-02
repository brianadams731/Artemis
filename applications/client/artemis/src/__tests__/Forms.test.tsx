import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Filling Forms', () => {
    let ele:HTMLDivElement;
    beforeAll(()=>{
        ele = document.createElement("div");
        ele.id = "portal1";
        document.body.appendChild(ele);
    });

    test("Email input should be present", () => {
        render(<>
           <input type="text" placeholder='Email' id="email-input" data-testid="email-input" required/>
        </>)
        const emailIn = screen.getByTestId("email-input");
        expect(emailIn).toBeInTheDocument();
    })

    test("Pass valid email", () => {
        render(<>
            <input type="text" placeholder='Email' id="email-input" data-testid="email-input"  required />
        </>)
        const emailIn = screen.getByTestId("email-input");
        userEvent.type(emailIn, "email@email.com");
        expect(screen.getByTestId("email-input")).toHaveValue("email@email.com");
    })

    test("Checking input box", () => {
        render(<>
            <input type="checkbox" data-testid="check" required />
        </>)
        const check = screen.getByTestId("check");
        userEvent.click(check);
        expect(check).toBeChecked();
    })

})
