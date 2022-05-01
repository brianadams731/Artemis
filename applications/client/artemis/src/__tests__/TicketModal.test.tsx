import { render, screen, fireEvent } from '@testing-library/react';
import {TicketModal} from "../components/TicketModal";
describe("Request New Workspace", () => {
    let ele:HTMLDivElement;
    beforeAll(()=>{
        ele = document.createElement("div");
        ele.id = "portal1";
        document.body.appendChild(ele);
    })

    test("Input for New Board", () => {
        render(
            <>
                <TicketModal state='new' boardId='123' closeModal={() => undefined} mutateWorkspace={()=>undefined as any}/>
            </>
        )
        const input = screen.getByTestId<HTMLInputElement>("title");
        const description = screen.getByTestId<HTMLTextAreaElement>("description");
        fireEvent.change(input, { target: { value: 'Test Title' } });
        fireEvent.change(description, { target: { value: 'Test Desc' } });
        expect(input.value).toEqual('Test Title');
        expect(description.value).toEqual('Test Desc');
    })

    test("Test edit name gets passed correctly", () => {
        render(
            <>
                <TicketModal state='edit' boardId='123' comment="Test Comment" description='Test Desc' id="123" closeModal={() => undefined} mutateWorkspace={()=>undefined as any}/>
            </>
        )
        const input = screen.getByTestId<HTMLInputElement>("title");
        const description = screen.getByTestId<HTMLTextAreaElement>("description");
        expect(description.value).toEqual('Test Comment');
        expect(input.value).toEqual('Test Desc');
    })
})
