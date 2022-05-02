import { render, screen, fireEvent } from '@testing-library/react';
import { WorkspaceModal } from "../components/WorkspaceModal";

describe("Request New Workspace", () => {
    let ele:HTMLDivElement;
    beforeAll(()=>{
        ele = document.createElement("div");
        ele.id = "portal1";
        document.body.appendChild(ele);
    })

    test("Input for New Workspace", () => {
        render(
            <>
                <WorkspaceModal state='new' closeModal={() => undefined} />
            </>
        )
        const input = screen.getByTestId<HTMLInputElement>("nameinput");
        fireEvent.change(input, { target: { value: 'Test Name' } });
        expect(input.value).toEqual('Test Name');
    })

    test("Test edit name gets passed correctly", () => {
        render(
            <>
                <WorkspaceModal state='edit' id="1" name='testedit' closeModal={() => undefined} />
            </>
        )
        const input = screen.getByTestId<HTMLInputElement>("nameinput");
        expect(input.value).toEqual('testedit');
    })

    test("Test number of All Workspaces differs from Your Workspaces", () => {
        
    })

})
