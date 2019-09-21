// Importing the Component from angular core
import { Component } from '@angular/core';
// Importing the required APIs for drag and drop UI implementation using Angular
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// Importing the MatChipInputEvent that gets invoked when a new chip is added
import { MatChipInputEvent } from '@angular/material/chips';

// Interface for Topic definition
export interface Topic {
  name: string;
}

/**
 * @title Drag&Drop disabled sorting
 */
// Defining the component metadata
@Component({
  selector: 'cdk-drag-drop-disabled-sorting',
  templateUrl: 'cdk-drag-drop-disabled-sorting.html',
  styleUrls: ['cdk-drag-drop-disabled-sorting.css'],
})

// Defining the component class
export class CdkDragDropDisabledSorting {
  // Array to hold the items
  items = [
    'did well ?',
    'did badly ?',
    'should start doing ? ',
    'should stop doing ?'
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // Array to hold the topics for chips
  topics: Topic[] = [
    { name: 'Points on exam' },
    { name: 'Group projects' },
    { name: 'Home assignments' },
    { name: 'Seminars' },
    { name: 'Lectures' },
    { name: 'Exam preparation' },
    { name: 'Guest Lectures' },
    { name: 'Literature' }
  ];

  // callback that gets invoked when chip is added
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.topics.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  // Callback that gets invoked when chip is removed
  remove(topic: Topic): void {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  // Callback that gets invoked when topic is dragged and dropped to items
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  dropTopic(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      moveItemInArray(this.topics, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
