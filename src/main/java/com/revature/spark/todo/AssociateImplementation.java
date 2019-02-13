package com.revature.spark.todo;

import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Expense;
import com.revature.spark.beans.User;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Your Name Here
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the sum of all expenses.
	 * 
	 * @param calls
	 * @return
	 */
	public Double sum(List<Expense> expenses) {
		double sum = 0;
		for(int i=0;i<expenses.size();i++)
		{
			sum = sum + expenses.get(i).getCost();
		}
		return sum;
	}

	/**
	 * Find the lowest expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double min(List<Expense> expenses) {
		double minVal = expenses.get(0).getCost();
		for(int i=1;i<expenses.size();i++) {
			if(minVal > expenses.get(i).getCost()) {
				minVal = expenses.get(i).getCost();
			}
		}
		return minVal;
	}

	/**
	 * Find the highest expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double max(List<Expense> expenses) {
		double maxVal = expenses.get(0).getCost();
		for(int i=1;i<expenses.size();i++) {
			if(maxVal < expenses.get(i).getCost()) {
				maxVal = expenses.get(i).getCost();
			}
		}
		return maxVal;
	}

	/**
	 * Find the average expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double avg(List<Expense> expenses) {
		double sum = 0;
		double avgVal = 0;
		for(int i=0;i<expenses.size();i++) {
			sum = sum + expenses.get(i).getCost();
		}
		avgVal = sum/expenses.size();
		return avgVal;
	}

	/**
	 * Find the median expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double median(List<Expense> expenses) {
		//store into array to be sorted
		double[] costArr = new double[expenses.size()];
		//populate array
		for(int i=0;i<expenses.size();i++) {
			costArr[i] = expenses.get(i).getCost();
		}
		
		//send array to 'quickSort' method to be sorted
		quickSort(costArr, 0, costArr.length-1);
		
		//find median, 'costArr' should be sorted by this point
		double output = 0;
		int mid = costArr.length/2;
		if(costArr.length%2 == 0) {
			output = costArr[mid-1] + costArr[mid];
			output = output/2;
		}
		else
			output = costArr[mid];
		
		return output;
	}
	
	//method accepts array, starting index, and ending index. Will recursively check array before the pivot point
	public void quickSort(double array[], int start, int end) {
		//stop condition: when the start position reaches before the end
		if(start<end) {
			int PI = partition(array, start, end);
			//after pivot index is found recursively sort values before pivot point
			quickSort(array, start, PI-1);
			//then after pivot point
			quickSort(array, PI+1, end);
		}
	}
	
	//method sets last element in array as pivot point and swaps lower elements before the pivot
	//returns new pivot point
	public int partition(double array[], int start, int end) {
		double pivot = array[end];
		int i = start-1;//must start before array index to prevent out of bounds exception
		for(int j=start; j<end; j++) {
			//if element(cost) is lower than pivot point then swap
			if(array[j] <= pivot) {
				i++;
				//swap elements
				double temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
		//move pivot to correct position in array
		double temp = array[i+1];
		array[i+1] = array[end];
		array[end] = temp;
		
		return i+1;
	}
	
	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the highest expense category for each user.
	 * 
	 * @param calls
	 * @return
	 */
	public Map<User, String> highestExpenseCategoryPerUser(List<Expense> expenses) {
		return null;
	}

}
