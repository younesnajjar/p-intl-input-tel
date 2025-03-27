import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FilterPipe {
    transform(items, field, value) {
        if (!items)
            return [];
        // @ts-ignore
        return items.filter((item) => item[field] === value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FilterPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.0", ngImport: i0, type: FilterPipe, isStandalone: true, name: "filter" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FilterPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'filter',
                    standalone: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wLWludGwtaW5wdXQtdGVsL3NyYy9waXBlL2ZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQU1wRCxNQUFNLE9BQU8sVUFBVTtJQUNyQixTQUFTLENBQUksS0FBaUIsRUFBRSxLQUFhLEVBQUUsS0FBVTtRQUN2RCxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLGFBQWE7UUFDYixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO3VHQUxVLFVBQVU7cUdBQVYsVUFBVTs7MkZBQVYsVUFBVTtrQkFKdEIsSUFBSTttQkFBQztvQkFDRixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUUsSUFBSTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZmlsdGVyJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtPFQ+KGl0ZW1zOiBUW10gfCBudWxsLCBmaWVsZDogc3RyaW5nLCB2YWx1ZTogYW55KTogVFtdIHtcbiAgICBpZiAoIWl0ZW1zKSByZXR1cm4gW107XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW06IFQpID0+IGl0ZW1bZmllbGRdID09PSB2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==