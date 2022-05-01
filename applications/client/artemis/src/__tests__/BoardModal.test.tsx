import { render, screen, fireEvent } from '@testing-library/react';
import { EditBoardModal } from '../components/EditBoardModal';

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
                <EditBoardModal state='new' workspaceId='123' closeModal={() => undefined} mutateWorkspace={()=>undefined as any}/>
            </>
        )
        const input = screen.getByTestId<HTMLInputElement>("boardInput");
        fireEvent.change(input, { target: { value: 'Test Name' } });
        expect(input.value).toEqual('Test Name');
    })

    test("Test edit name gets passed correctly", () => {
        render(
            <>
                <EditBoardModal state='edit' workspaceId='123' name="testedit" id="123" closeModal={() => undefined} mutateWorkspace={()=>undefined as any}/>
            </>
        )
        const input = screen.getByTestId<HTMLInputElement>("boardInput");
        expect(input.value).toEqual('testedit');
    })
})
